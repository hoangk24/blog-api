import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto, CreateReplyDto } from './dto/create-comment.dto';

@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':postId')
  getPostComment(@Param('postId') postId: number) {
    return this.commentService.getPostComments(postId);
  }

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Post()
  createReplies(@Body() createReplyDto: CreateReplyDto) {
    return this.commentService.createReply(createReplyDto);
  }
}
