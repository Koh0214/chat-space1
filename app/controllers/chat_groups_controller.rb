class ChatGroupsController < ApplicationController
	def new
	end

	def create
		set_params_group
		set_params_chat_group
		binding.pry
		redirect_to :root
	end

	private
	def set_params_group 
		params.require(:group).permit(:group_users => [])
		# GroupUser.create(user_id: params[:group][:group_users])
	end
	def set_params_chat_group
		params.require(:chat_group).permit(:name, :user_ids => [])
		Group.create(name: params[:chat_group][:name])
	end
end
