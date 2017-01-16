class MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @message = Message.new
  end

  def create
    if params[:message][:body].present?
      message = current_user.messages.create(set_params)
      redirect_to group_messages_path
    else
      redirect_to group_messages_path, notice: '何か書かないと送信できません'
    end
  end

  private

  def set_params
    params.require(:message).permit(:body).merge(group_id: params[:group_id])
  end
end
