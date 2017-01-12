class ChatGroupsController < ApplicationController
	def new
	end

	def create
		set_params
		set_params2
		binding.pry
		redirect_to :root
	end

	private
	def set_params 
		params.require(:group).permit(:group_users => [])
	end
	def set_params2
		params.require(:chat_group).permit(:name, :user_ids => [])
	end
end
