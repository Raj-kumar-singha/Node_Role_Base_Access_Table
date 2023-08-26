module.exports = (sequelize, DataTypes) => {
  return sequelize.define('sessionlogs',{
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      email: {
        type: DataTypes.STRING,
      },
      login_at: {
        type: DataTypes.DATE,
      },
      logout_at: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
    }
  );
};
