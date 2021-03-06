class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_current_user_info

  def index
    @group = Group.find(params[:group_id])
    @groups = current_user.groups
    @message = Message.new
    @messages = @group.messages

    # メッセージの自動更新
    last_message = @group.messages.last
    gon.last_message_name = last_message.user.name if last_message.present?
    gon.group_id = @group.id

    respond_to do |format|
      format.html {return}
      format.json { render json: last_message }
    end
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
