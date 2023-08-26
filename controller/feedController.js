const Feed = require('../models/index').feed;

let myFeed = function () {
  this.createFeed = async (req, res) => {
    try {
      const { name, url, description } = req.body;
      // Implement feed creation logic based on role
      // Example: Only Super Admin and Admin can create feeds
      if (req.user.role === 'superadmin' || req.user.role === 'admin') {
        const newFeed = await Feed.create({ name, url, description });
        console.log('-------------------->', newFeed);
        res.status(201).json(newFeed);
      } else {
        res.status(403).json({ error: 'Permission denied' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  this.getFeed = async (req, res) => {
    try {
      const feedId = req.params.id;
      const feed = await Feed.findByPk(feedId);
      if (!feed) {
        res.status(404).json({ error: 'Feed not found' });
        return;
      }
      // Implement feed retrieval logic based on role
      // Example: Super Admin, Admin, and Basic User can access feeds they have access to
      // Here, you would need a mechanism to check if the user has access to this feed
      // Return feed details if the user has access
      res.status(200).json(feed);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  this.updateFeed = async (req, res) => {
    try {
      const feedId = req.params.id;
      const { name, url, description } = req.body;
      const feed = await Feed.findByPk(feedId);
      if (!feed) {
        res.status(404).json({ error: 'Feed not found' });
        return;
      }
      // Implement feed update logic based on role
      // Example: Only Super Admin and Admin can update feeds
      if (req.user.role === 'superadmin' || req.user.role === 'admin') {
        await feed.update({ name, url, description });
        res.status(200).json(feed);
      } else {
        res.status(403).json({ error: 'Permission denied' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  this.deleteFeed = async (req, res) => {
    try {
      const feedId = req.params.id;
      const feed = await Feed.findByPk(feedId);
      if (!feed) {
        res.status(404).json({ error: 'Feed not found' });
        return;
      }
      // Implement feed deletion logic based on role
      // Example: Only Super Admin and Admin with delete access can delete feeds
      if (
        req.user.role === 'Super Admin' ||
        (req.user.role === 'Admin' && feed.deleteAccessBy.includes(req.user.id))
      ) {
        await feed.destroy();
        res.status(204).send();
      } else {
        res.status(403).json({ error: 'Permission denied' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

module.exports = new myFeed();