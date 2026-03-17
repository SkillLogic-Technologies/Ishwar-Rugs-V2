import UserActivity from "../models/UserActivity.js";

export const trackVisit = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    let filter = { date: today };

    if (req.identity.type === "user") {
      filter.userId = req.identity.id;
    } else {
      filter.guestId = req.identity.id;
    }

    const existing =
      await UserActivity.findOne(filter);

    if (existing) {
      existing.lastVisitAt = new Date();
      await existing.save();
    } else {
      await UserActivity.create({
        date: today,
        userId:
          req.identity.type === "user"
            ? req.identity.id
            : null,
        guestId:
          req.identity.type === "guest"
            ? req.identity.id
            : null,
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const getDailyUsers = async (req, res) => {
  try {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    const count =
      await UserActivity.countDocuments({
        date: today,
      });

    res.json({
      success: true,
      dailyUsers: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};

export const getUsersGraph = async (req, res) => {
  try {
    const data =
      await UserActivity.aggregate([
        {
          $group: {
            _id: "$date",
            users: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

    res.json({
      success: true,
      graph: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};


