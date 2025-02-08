import asyncHandler from "express-async-handler";
import ClientModel from "../models/ClientModel.js";
import UserModel from "../models/UserModel.js";
import uniqueId from "nodejs-unique-numeric-id-generator";

// 📌 Create a New Client (Admin Only)
export const createClient = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (user && user.isAdmin) {
    const client = new ClientModel({
      user: user._id,
      name: req.body.name || "New Client",
      email: req.body.email || `client_${uniqueId.generate()}`,
      clientId: uniqueId.generate(),
      address: req.body.address || "No Address Provided",
      phone: req.body.phone || "No Phone Provided",
      registrationNumber: req.body.registrationNumber || "N/A",
      images: req.body.images || [],
    });

    const createdClient = await client.save();
    res.status(201).json(createdClient);
  } else {
    res.status(403);
    throw new Error("Not authorized to create clients");
  }
});

// 📌 Get All Clients (Admin Only)
export const getClients = asyncHandler(async (req, res) => {
  const clients = await ClientModel.find({});
  res.json(clients);
});

// 📌 Get Client by ID
export const getClientById = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id);

  if (client) {
    res.json(client);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

// 📌 Update Client Information (Admin Only)
export const updateClient = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id);

  if (client) {
    client.name = req.body.name || client.name;
    client.email = req.body.email || client.email;
    client.address = req.body.address || client.address;
    client.phone = req.body.phone || client.phone;
    client.registrationNumber =
      req.body.registrationNumber || client.registrationNumber;
    client.images = req.body.images || client.images;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});

// 📌 Delete Client (Admin Only)
export const deleteClient = asyncHandler(async (req, res) => {
  const client = await ClientModel.findById(req.params.id);

  if (client) {
    await client.remove();
    res.json({ message: "Client removed successfully" });
  } else {
    res.status(404);
    throw new Error("Client not found");
  }
});
