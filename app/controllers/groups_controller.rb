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

	def update
		# こんな感じでアップデートする
		# tweet = Tweet.find(params[:id])
  #   tweet.update(tweet_params) if tweet.user_id == current_user.id
	end

	private
	def set_params
		params.require(:group).permit(:name, { user_ids: [] })
	end

end
