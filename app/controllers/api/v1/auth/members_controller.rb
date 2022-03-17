module Api
  module V1
    module Auth
      class MembersController < ApplicationController
        before_action :set_member, only: [:show, :update, :destroy]

        def index
          members = Member.order(created_at: :desc)
          render json: members
        end

        def show
          render json: @member
        end

        def create
          member = Member.new(member_params)
          if member.save
            render json: member
          else
            render json: member.errors
          end
        end

        def destroy
          @member.destroy
          render json: @member
        end

        def update
          if @member.update(member_params)
            render json: @member
          else
            render json: @member.errors
          end
        end

        private

        def set_member
          @member = Member.find(params[:id])
        end

        def member_params
          params.require(:member).permit(:name, :nickname, :image, :email, :hobbies, :recent_topic)
        end
      end
    end
  end
end
