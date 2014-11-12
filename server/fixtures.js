if (Posts.find().count() === 0) {
  Posts.insert({
    author: 'jumal@harvestlearninggroup.com',
    body: 'Going to get boba!'
  });

  Posts.insert({
    author: 'charlesgum@gmail.com',
    body: 'watching the game at McSorley\'s'
  });

  Posts.insert({ 
    author: 'dirkgaines@test.com',
    body: 'new testing data'
  });
}