import { useModalStore } from "../../../stores/useModalStore"

export const CreateTaskModal = () => {
    const {isOpen, closeModal} = useModalStore();

    if(!isOpen) return null;
    console.log("hii")

    return(
     <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Dark Blurred Backdrop */}
      <div 
        onClick={closeModal} 
        className="fixed inset-0 bg-black/50 cursor-pointer" 
      />

      {/* Modal Box */}
      <div className="relative bg-app-card rounded-lg shadow-2xl w-2xl z-10">
        <div className="flex justify-between items-center border-b border-app-border p-6">
          <h3 className="font-semibold text-lg text-text-main">Create a New Task</h3>
          <button 
            onClick={closeModal} 
            className="text-text-main size-6 rounded-md hover:bg-text-ghost transition"
          >
            X
          </button>
        </div>
        
        {/* form fiels*/}
        <div className="mt-4 px-6">
          <input className="text-text-main text-xl font-semibold w-full outline-none" 
          type="text"
          placeholder="Summary"/>

          <textarea className="text-text-muted text-md w-full outline-none overflow-y h-20" 
          placeholder="Add a description" />
        </div>

        <div className="flex gap-2 px-6 pb-4">
            <span className="border border-app-border rounded-sm bg-app-input-bg px-4 py-1 text-text-muted">Assign</span>
            <span className="border border-app-border rounded-sm bg-app-input-bg px-4 py-1 text-text-muted">Priority</span>
            <span className="border border-app-border rounded-sm bg-app-input-bg px-4 py-1 text-text-muted">Labels</span>
            <span className="border border-app-border rounded-sm bg-app-input-bg px-4 py-1 text-text-muted">Due date</span>
        </div>
        <div className="border-t border-app-border flex justify-end px-6 py-4">
            <button className="bg-app-button py-1 px-4 rounded-md text-black text-sm font-poppins">Create</button>
        </div>
      </div>
    </div>
    )
}