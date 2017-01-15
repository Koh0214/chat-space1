class MessagesController < ApplicationController
  def index
    @groups = Group.all
    @group = Group.find(params[:group_id])
    @message = Message.new
  end

  def create
    case params[:message][:body].empty?
    when true
      redirect_to request.original_url, notice: '何か書かないと送信できません'
    when false
      message = Message.create(set_params)
      redirect_to request.original_url
    end
  end

  private
  def set_params
    params[:user_id] = current_user.id
    params1 = params.require(:message).permit(:body)
    params2 = params.permit(:group_id, :user_id)
    final_params = params1.merge(params2)
  end
end
