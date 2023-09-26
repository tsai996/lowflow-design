export interface FlowNode {
    id: string;
    pid: string | null;
    name: string;
    type: string;
    child: FlowNode | null;
    props?: Record<string, any>;
}
