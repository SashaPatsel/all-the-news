var Sequelize = require("sequelize");


module.exports = function(sequelize, DataTypes) {
    const Story = sequelize.define("Story", {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV1,
          isUnique :true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique :true,
            validate: {
                isEmail: true,
                min: 4
            }
        },
        local_pw: {
            type: DataTypes.STRING,
            required: true,
            validate: {
                min:6
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    });

    // methods ======================
    // generating pw hash
    User.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };
    // validate pw
    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.local_pw);
    };

    // accociations ======================

    User.associate = function(models){
        User.hasOne(models.Account, {
            foreignKey: "accountUUID",
            onDelete: "cascade"
        });
    };

    User.associate = function(models){
        User.hasMany(models.Stories, {
            foreignKey: "accountUUID",
            onDelete: "cascade"
        });
    };



    return User;
}
