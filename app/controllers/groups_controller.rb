class GroupsController < ApplicationController

	def index
		@groups = Group.all
	end

	def new
		@group = Group.new
	end

	def edit
		@group = Group.find(params[:id])
	end

	def create
		Group.create(set_params)
		redirect_to :root
	end

	private
	def set_params
		params.require(:group).permit(:name, { user_ids: [] })
	end

end
