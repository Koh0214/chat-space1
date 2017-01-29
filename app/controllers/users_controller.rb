class UsersController < ApplicationController

  def index
    users = User.where("name like '%" + params[:text] + "%'")
    render json: users
  end
end
