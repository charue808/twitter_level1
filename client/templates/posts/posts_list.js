var postData = [
{
	author: 'jumal@harvestlearninggroup.com',
	body: 'Going to get boba!'
},
{
	author: 'charlesgum@gmail.com',
	body: 'watching the game at McSorley\'s'
},
{
	author: 'dirkgaines@test.com',
	body: 'new testing data'
}
];
Template.postsList.helpers({
	posts: postData
});