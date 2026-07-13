import React, { useContext, useState } from "react";
import { MdLayers, MdAdd, MdDelete } from "react-icons/md";
import { ProductFormContext } from "../context/ProductFormContext";

export const ProductVariants: React.FC = () => {
  const context = useContext(ProductFormContext);
  if (!context) return null;

  const { formState, setFormState } = context;

  // Local state for variant creation inputs
  const [newVarName, setNewVarName] = useState("");
  const [newVarSku, setNewVarSku] = useState("");
  const [newVarPrice, setNewVarPrice] = useState("");
  const [newVarStock, setNewVarStock] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddVariant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVarName || !newVarSku || !newVarPrice || !newVarStock) {
      alert("Please fill in all variant fields");
      return;
    }

    const priceNum = Number(newVarPrice);
    const stockNum = Number(newVarStock);

    if (isNaN(priceNum) || isNaN(stockNum)) {
      alert("Price and Stock must be valid numbers");
      return;
    }

    // Append variant to shared form state
    setFormState(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          name: newVarName,
          sku: newVarSku,
          price: priceNum,
          stock: stockNum
        }
      ]
    }));

    // Reset fields
    setNewVarName("");
    setNewVarSku("");
    setNewVarPrice("");
    setNewVarStock("");
    setShowAddForm(false);
  };

  const removeVariant = (index: number) => {
    setFormState(prev => ({
      ...prev,
      variants: prev.variants.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <section className="bg-white p-6 rounded-2xl border border-[#dfbec4]/30 shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#dfbec4]/10 pb-3">
        <h3 className="font-display text-lg font-extrabold text-[#131b2e] flex items-center gap-2">
          <MdLayers className="text-[#b31f56] w-5 h-5 shrink-0" />
          Product Variants
        </h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#ffd167] text-[#765900] px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <MdAdd className="w-4 h-4" />
          {showAddForm ? "Cancel" : "Add Variant"}
        </button>
      </div>

      {/* Dynamic creation form */}
      {showAddForm && (
        <form onSubmit={handleAddVariant} className="bg-[#faf8ff] p-4 rounded-xl border border-[#dfbec4]/20 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider mb-1">
                Variant Name (e.g. Pink / 0-3M)
              </label>
              <input 
                type="text" 
                placeholder="Pink / 0-3M"
                value={newVarName}
                onChange={(e) => setNewVarName(e.target.value)}
                className="w-full bg-white border border-[#dfbec4]/30 rounded-lg p-2 text-xs outline-none text-[#131b2e]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider mb-1">
                Variant SKU
              </label>
              <input 
                type="text" 
                placeholder="KDS-001-P-03"
                value={newVarSku}
                onChange={(e) => setNewVarSku(e.target.value)}
                className="w-full bg-white border border-[#dfbec4]/30 rounded-lg p-2 text-xs outline-none text-[#131b2e]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider mb-1">
                Price ($)
              </label>
              <input 
                type="number" 
                step="0.01"
                placeholder="24.00"
                value={newVarPrice}
                onChange={(e) => setNewVarPrice(e.target.value)}
                className="w-full bg-white border border-[#dfbec4]/30 rounded-lg p-2 text-xs outline-none text-[#131b2e]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#584045]/70 uppercase tracking-wider mb-1">
                Stock Quantity
              </label>
              <input 
                type="number" 
                placeholder="15"
                value={newVarStock}
                onChange={(e) => setNewVarStock(e.target.value)}
                className="w-full bg-white border border-[#dfbec4]/30 rounded-lg p-2 text-xs outline-none text-[#131b2e]"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-[#b31f56] text-white font-bold text-xs rounded-lg shadow-sm hover:brightness-105 transition-all"
          >
            Confirm and Add Variant
          </button>
        </form>
      )}

      {formState.variants.length === 0 ? (
        <div className="p-4 rounded-xl bg-[#f2f3ff]/40 text-xs text-[#584045] font-semibold leading-relaxed border border-[#dfbec4]/10 text-center">
          No variants defined yet. Click "Add Variant" to configure custom sizes or colors.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#dfbec4]/30">
          <table className="w-full text-left">
            <thead className="bg-[#f2f3ff] text-xs font-bold text-[#584045]/80">
              <tr>
                <th className="p-3">Variant</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dfbec4]/20 text-xs font-semibold text-[#131b2e]">
              {formState.variants.map((v, index) => (
                <tr key={index} className="hover:bg-[#faf8ff] transition-colors">
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#dfbec4] border border-[#dfbec4]" />
                    <span>{v.name}</span>
                  </td>
                  <td className="p-3 text-[#584045]/70">{v.sku}</td>
                  <td className="p-3 font-bold">${v.price.toFixed(2)}</td>
                  <td className="p-3">
                    <span className="bg-[#ffd167]/30 px-2 py-0.5 rounded text-[#765900] font-extrabold text-[10px]">
                      {v.stock} Units
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => removeVariant(index)}
                      className="text-[#ba1a1a] hover:text-[#ba1a1a]/80 transition-colors cursor-pointer"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};
