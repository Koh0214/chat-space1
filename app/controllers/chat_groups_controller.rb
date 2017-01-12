class ChatGroupsController < ApplicationController
	
	def new
		@group = Group.new
	end

	def create
		set_params
		redirect_to :root
	end

	private
	def set_params
		params.require(:group).permit(:group_users => [])
		params.require(:chat_group).permit(:name, :user_ids => [])
		Group.create(name: params[:chat_group][:name])
	end

end
