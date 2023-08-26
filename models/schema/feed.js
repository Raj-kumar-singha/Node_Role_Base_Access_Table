module.exports = (sequelize, DataTypes) => {
  return sequelize.define('feeds',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
};

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../../config/postgredb');

// const Feed = sequelize.define('Feeds', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   url: {
//     type: DataTypes.STRING,
//     allowNull: false,
//  },
//   description: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// });

// module.exports = Feed;