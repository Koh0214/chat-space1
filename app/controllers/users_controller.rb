class UsersController < ApplicationController

  def index
    users = User.where.not(id: current_user.id).where("name like '%" + params[:text] + "%'")
    respond_to do |format|
      format.html
      format.json { render json: users }
    end
  end
end
