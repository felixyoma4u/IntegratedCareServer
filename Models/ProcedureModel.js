import mongoose from "mongoose";

export const ProcedureSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Procedure = mongoose.model("Procedure", ProcedureSchema);

export default Procedure;
