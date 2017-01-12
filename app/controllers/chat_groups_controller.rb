class ChatGroupsController < ApplicationController

	def new
		@group = Group.new
	end

	def create
		Group.create(name: set_params[:name])
		redirect_to :root
	end

	private
	def set_params
		params.require(:group).permit(:group_users => [])
		params.require(:chat_group).permit(:name, :user_ids => [])
	end

end
