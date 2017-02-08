class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @message = Message.new
    @messages = @group.messages

    last_message = @group.messages.last

    respond_to do |format|
      format.html
      format.json { render json: last_message }
    end

    gon.group_id = @group.id
    gon.current_user_name = current_user.name
    gon.last_message_name = last_message.user.name
  end

  def create
    @message = Message.new(set_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path }
        format.json { render json: @message }
      end
    else
      redirect_to group_messages_path, alert: '送信に失敗しました'
    end
  end

  private

  def set_params
    params.require(:message).permit(:body, :image, :image_cache).merge(group_id: params[:group_id], user_id: current_user.id)
  end
end
