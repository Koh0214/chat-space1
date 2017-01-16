class GroupsController < ApplicationController
  before_action :move_to_registration
  before_action :set_group, except: :index

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create 
    group = Group.new(set_params)
    if group.save
      redirect_to :root
    else
      redirect_to new_group_path, alert: 'グループの作成に失敗しました'
    end
  end

  def edit
  end

  def update
    if @group.update(set_params)
      redirect_to :root
    else
      redirect_to edit_group_path, alert: 'グループの更新に失敗しました'
    end
  end

  private
  def set_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

  def move_to_registration
    redirect_to new_user_session_path, notice: 'サービスの使用前にログインが必要です' unless user_signed_in?
  end

  def find_group_id
    Group.find(params[:id])
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
