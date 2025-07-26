import DotActivity from "@/src/components/form/dot";
import Sidebar from "@/src/components/form/sidebar";

export default function Test() {
    return (
        <div className="flex flex-row">
            <Sidebar />
            <DotActivity variant="done"/>  
        </div>
    )
}