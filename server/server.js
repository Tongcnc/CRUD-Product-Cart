import multer from "multer";
import path from "path";
import express from "express";
import cors from "cors";
import mysql from "mysql2";

// Create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "shopitem",
});

async function init() {
  var app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.static("public"));

  // multer for file upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

  const upload = multer({
    storage: storage,
  });

  app.get("/product", (req, res) => {
    let keywords = req.query.keywords;

    if (!keywords) {
      return res.status(400).json({
        message:
          "Please send either keywords or code parameter in the URL endpoint",
      });
    }

    let sql = "SELECT * FROM `product` WHERE 1";
    let params = [];

    if (keywords) {
      sql += " AND (product LIKE ? OR code LIKE ?)";
      params.push("%" + keywords.split(" ").join("%") + "%");
      params.push("%" + keywords.split(" ").join("%") + "%");
    }

    connection.query(sql, params, function (err, results, fields) {
      if (err) {
        return res.status(500).json({
          message: "Error occurred while fetching data from database",
          error: err.message,
        });
      }

      res.json({
        data: results,
      });
    });
  });

  app.get("/product/:id", function (req, res, next) {
    const id = req.params.id;
    connection.query(
      "SELECT * FROM `product` WHERE id = ?",
      [id],
      function (err, results) {
        res.json(results);
        console.log(results);
      }
    );
  });

  app.post("/product", upload.single("file"), async function (req, res, next) {
    try {
      connection.query(
        "INSERT INTO `product`(`product`, `code`, `price`, `quanity`, `image`) VALUES (?, ?, ?, ?, ?)",
        [
          req.body.product,
          req.body.code,
          req.body.price,
          req.body.quanity,
          req.file.filename,
        ],
        function (err, results) {
          if (err) {
            console.error("Error creating product:", err);
            res.status(500).json({ error: "Error creating product" });
          } else {
            res.json(results);
          }
        }
      );
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Error creating product" });
    }
  });

  app.put(
    "/product/:id",
    upload.single("file"),
    async function (req, res, next) {
      try {
        let updateFields = [
          "product = ?",
          "code = ?",
          "price = ?",
          "quanity = ?",
        ];
        let updateParams = [
          req.body.product,
          req.body.code,
          req.body.price,
          req.body.quanity,
        ];

        if (req.file) {
          updateFields.push("image = ?");
          updateParams.push(req.file.filename);
        }

        connection.query(
          "UPDATE `product` SET " + updateFields.join(", ") + " WHERE id = ?",
          [...updateParams, req.params.id],
          function (err, results) {
            if (err) {
              console.error("Error updating product:", err);
              res.status(500).json({ error: "Error updating product" });
            } else {
              res.json(results);
            }
          }
        );
      } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Error updating product" });
      }
    }
  );

  app.delete("/product/:id", function (req, res, next) {
    try {
      const id = req.params.id;
      connection.query(
        "DELETE FROM `product` WHERE id = ?",
        [id],
        function (err, results) {
          if (err) {
            console.error("Error deleting product:", err);
            res.status(500).json({ error: "Error deleting product" });
          } else {
            res.json(results);
          }
        }
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Error deleting product" });
    }
  });

  app.listen(5000, function () {
    console.log("CORS-enabled web server listening on port 5000");
  });
}

init();
