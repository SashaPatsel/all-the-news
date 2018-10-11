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





    return Story;
}
