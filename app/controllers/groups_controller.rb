class GroupsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_group, only: [:edit, :update]

  def index
    @groups = current_user.groups
  end

  def new
    @group = Group.new
  end

  def create
    @group = Group.new(set_params)
    if @group.save
      flash[:notice] =  'グループを作成しました！'
      respond_to do |format|
        format.json { render json: @group }
      end
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

  def set_group
    @group = Group.find(params[:id])
  end
end
