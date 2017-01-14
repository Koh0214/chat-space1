class MessagesController < ApplicationController
  def index
  	# binding.pry
  	@groups = Group.all
  	@group = Group.find(params[:group_id])
  	@message = Message.new
  end

  def new
  end

  def create
  	message = Message.create(set_params)
		# redirect_to :root
  end

  private
  def set_params
  	params[:user_id] = current_user.id
  	params1 = params.require(:message).permit(:body)
  	params2 = params.permit(:group_id, :user_id)
  	final_params = params1.merge(params2)
  end
end
