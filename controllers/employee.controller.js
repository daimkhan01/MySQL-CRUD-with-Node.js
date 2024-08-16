const express = require("express"),
  router = express.Router();

const service = require("../services/employee.service");

//localhost:3000/api/employees/
// Create
http: router.post("/", async (req, res) => {
  await service.addOrEditEmployee(req.body);
  res.status(201).send("created successfully.");
});

// Read
router.get("/", async (req, res) => {
  const employees = await service.getAllEmployees();
  res.send(employees);
});

//  Read_by_ID
router.get("/:id", async (req, res) => {
  const employee = await service.getEmployeeById(req.params.id);
  if (employee == undefined)
    res.status(404).json("no record with given id : " + req.params.id);
  else res.send(employee);
});

//  Update
router.put("/:id", async (req, res) => {
  const affectedRows = await service.addOrEditEmployee(req.body, req.params.id);
  if (affectedRows == 0)
    res.status(404).json("no record with given id : " + req.params.id);
  else res.send("updated successfully.");
});

//  Delete
router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteEmployee(req.params.id);
  if (affectedRows == 0)
    res.status(404).json("no record with given id : " + req.params.id);
  else res.send("deleted successfully.");
});

module.exports = router;

// ...CRUD...
// create -POST
// read - GET
// update - PUT
// delete - DELETE
