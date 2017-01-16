class GroupsController < ApplicationController

  def index
    if user_signed_in?
      @groups = current_user.groups
    else
      redirect_to new_user_session_path
    end
  end

  def new
    @group = Group.new
  end

  def create 
    group = Group.new(set_params)
    if group.save
      @user_ids = set_params[:user_ids]
      redirect_to :root
    else
      redirect_to new_group_path, alert: 'グループ名と1名以上のメンバーは必須です'
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    group = Group.find(params[:id])
    group.update(set_params)
    redirect_to :root
  end

  private
  def set_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

end
