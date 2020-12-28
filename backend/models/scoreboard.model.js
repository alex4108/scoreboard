const { isValidObjectId } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: String,
          description: String,
          started_at: Date,
          ended_at: Date,
          players: [
              {
                player_id: { type: mongoose.Schema.Types.ObjectId }, // TODO Enforce link to Player model
                score: Number
              }
          ],
        },
        { timestamps: true }
    );
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Scoreboard = mongoose.model("scoreboard", schema);
    return Scoreboard;
  };