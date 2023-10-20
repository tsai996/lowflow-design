export interface FlowNode {
    id: string;
    pid: string | null;
    name: string;
    type: string;
    child: FlowNode | null;
}

export interface ErrorInfo {
    showError: boolean,
    message: string
}
