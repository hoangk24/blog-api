import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, CreateReplyDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { ErrorHandler } from '@/cores/error.service';
import { PostService } from './post.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  async getPostComments(postId: number) {
    return this.commentRepository.find({ where: { post: { id: postId } } });
  }

  async createComment(data: CreateCommentDto) {
    const comment = new Comment();
    comment.email = data.email;
    comment.content = data.content;
    comment.post = await this.postService.findOne(data.postId);

    return this.commentRepository.save(comment);
  }

  async createReply(data: CreateReplyDto) {
    const parentComment = await this.commentRepository.findOne({
      where: {
        id: data.parentId,
      },
    });

    if (!parentComment) {
      ErrorHandler.throwNotFoundException('Parent comment not found');
    }

    const reply = new Comment();
    reply.email = data.email;
    reply.content = data.content;
    reply.parent = parentComment;

    return this.commentRepository.save(reply);
  }
}
