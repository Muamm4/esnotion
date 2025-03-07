import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSiderbarDocuments = query({
  args:{
      parentDocument: v.optional(v.id("documents"))
    }
  ,
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const userId = identity.subject;
    const documents = await ctx.db.query("documents")
    .withIndex('by_user_parent', (query) =>
      query.eq("userId", userId)
    .eq("parentDocument", args.parentDocument))
    .filter((query) =>
      query.eq(query.field("isArchived"),false))
    .order('desc')
    .collect();

    return documents;
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;
    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId: userId,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});

export const archive = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    var documentExist = await ctx.db.get(args.id);

    if (!documentExist) {
      throw new Error("Document not found");
    }
    if(documentExist.userId != userId){
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) =>{
      const children = await ctx.db.query("documents")
      .withIndex('by_user_parent',
         (q) => q.eq("userId", userId)
      .eq("parentDocument", documentId))
      .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {isArchived: true});
        await recursiveArchive(child._id);
      }
    }

    const document = await ctx.db.patch(args.id, {isArchived: true});

    await recursiveArchive(args.id);

    return document

  },
})

export const deleteDoc = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    var documentExist = await ctx.db.get(args.id);

    if (!documentExist) {
      throw new Error("Document not found");
    }
    if(documentExist.userId != userId){
      throw new Error("Unauthorized");
    }

    const recursiveDelete = async (documentId: Id<"documents">) =>{
      const children = await ctx.db.query("documents")
      .withIndex('by_user_parent',
         (q) => q.eq("userId", userId)
      .eq("parentDocument", documentId))
      .collect();

      for (const child of children) {
        await ctx.db.delete(child._id);
        await recursiveDelete(child._id);
      }
    }

    const document = await ctx.db.delete(args.id);

    await recursiveDelete(args.id);

    return document

  },
})