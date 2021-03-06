class GroupsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_group, only: [:edit, :update]
  before_action :set_current_user_info

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(set_params)
    if @group.save
      redirect_to :root, notice: 'グループを作成しました！'
    else
      render new_group_path, alert: 'グループの作成に失敗しました'
    end
  end

  def edit
    gon.users = @group.users.where.not(id: current_user.id)
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

  def set_group
    @group = Group.find(params[:id])
  end

end
