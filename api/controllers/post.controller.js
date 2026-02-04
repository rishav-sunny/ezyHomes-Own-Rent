import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const getPosts = async (req, res) => {
    const query = req.query;

    try {
        const posts = await prisma.post.findMany({
            where: {
                city: query.city ? {
                    contains: query.city,
                    mode: 'insensitive'
                } : undefined,
                state: query.state ? {
                    contains: query.state,
                    mode: 'insensitive'
                } : undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price: {
                    gte: parseInt(query.minPrice) || 0,
                    lte: parseInt(query.maxPrice) || 10000000,
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: query.limit ? parseInt(query.limit) : undefined,
        });
        // setTimeout(() => {
            res.status(200).json(posts);
        // }, 3000);
    } catch (error) {
        console.error('Error in getPosts:', error);
        res.status(500).json({message: "Failed to get posts", error: error.message});
    }
}


export const getPost = async (req, res) => {
    
    const id = req.params.id;

    try {
        const post = await prisma.post.findUnique({
           where: { id },
           include: {
               postDetail: true,
               user: {
                   select: {
                       id: true,
                       username: true,
                       avatar: true,
                   }
               },
           }
        })

        

        let userId;

        const token = req.cookies?.token;

        if(!token){
            userId = null;
        }else{
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
                if(err){
                    userId = null;
                }else {
                    userId = payload.id;
                }
            })
        }

        const saved = await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    postId: id,
                    userId,
                },
            },            
        });



        res.status(200).json({...post, isSaved: saved ? true : false});
    } catch (error) {
        res.status(500).json({message: "Failed to get post"});
    }
}


export const addPost = async (req, res) => {
    
    const body = req.body;
    const tokenUserId = req.userId;

    try {
         const post = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail:{
                    create: body.postDetail,
                },
            }
         })

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: "Failed to create post"});
    }
}


export const updatePost = async (req, res) => {

    const { id } = req.params;
    const tokenUserId = req.userId;
    const { postData, postDetail } = req.body;

    try {
        // Check if post exists and user owns it
        const post = await prisma.post.findUnique({
            where: { id },
            include: { postDetail: true }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" });
        }

        // Update post data
        const updatedPost = await prisma.post.update({
            where: { id },
            data: postData,
        });

        // Update post details if they exist
        if (postDetail && post.postDetail) {
            await prisma.postDetail.update({
                where: { postId: id },
                data: postDetail
            });
        }

        // Fetch the updated post with details
        const finalPost = await prisma.post.findUnique({
            where: { id },
            include: {
                postDetail: true,
                user: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    }
                }
            }
        });

        res.status(200).json(finalPost);
    } catch (err) {
        res.status(500).json({ message: "Failed to update post!", error: err.message });
    }
}


export const deletePost = async (req, res) => {
    
    const { id } = req.params;
    const tokenUserId = req.userId;

    // console.log(id, tokenUserId);
    
    try {

        const post = await prisma.post.findUnique({
            where: {id}
        })

        if(post.userId !== tokenUserId){
            return res.status(403).json({message: "Not Authorized"});
        }

        await prisma.post.delete({
            where: {id}
        })

        res.status(200).json("Post deleted successfully");
    } catch (error) {
        res.status(500).json({message: "Failed to delete post"});
    }
}