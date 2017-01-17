class MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @message = Message.new
    @messages = @group.messages
  end

  def create
    message = current_user.messages.new(set_params)
    if message.save
      redirect_to group_messages_path
    else
      redirect_to group_messages_path, alert: '送信に失敗しました'
    end
  end

  private

  def set_params
    params.require(:message).permit(:body).merge(group_id: params[:group_id])
  end
end
