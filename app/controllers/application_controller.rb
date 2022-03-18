class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken
      
        skip_before_action :verify_authenticity_token
        helper_method :current_member, :member_signed_in?
      end