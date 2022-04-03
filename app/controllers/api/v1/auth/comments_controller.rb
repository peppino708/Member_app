module Api
  module V1
    module Auth
      class CommentsController < ApplicationController
        before_action :set_post, only: [:index, :create, :show, :destroy]

        def index
          comments = @post.comments.order(created_at: :desc)
          render json: comments
        end

        def show
          @comment = @post.comments.find(params[:id])
          render json: @comment
        end

        def create
          @post.comments.create(comment_params)
          render json: @post.comments
        end

        def destroy
          @comment = @post.comments.find(params[:id])
          @comment.destroy
          render json: @comment
        end

        private

        def set_post
          @post = Post.find(params[:post_id])
        end

        def comment_params
          params.permit(:content, :user_id)
        end
      end
    end
  end
end
