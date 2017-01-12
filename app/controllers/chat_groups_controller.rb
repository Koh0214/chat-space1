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
		params.require(:chat_group).permit(:name, :user_ids => []).merge(:group_users, params[:group][:group_users])
	end

end
