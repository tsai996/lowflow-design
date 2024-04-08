import http from '~/api/index'
import FileSaver from "file-saver";

export const downloadXml = async (data: object) => {
    const res = await http.download('https://www.666cxf.com/api/model/download', data)
    FileSaver.saveAs(
        new Blob([res], { type: 'application/octet-stream;charset=utf-8' }),
        '测试流程.bpmn20.xml'
    )
}
