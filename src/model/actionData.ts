namespace ActionsModel {

    interface IhandleAction {
        el: any,
        newNode: any,
        action: 'create' | 'delete' | 'paste'
    }

    export const handleAction = ({ action, el, newNode }: IhandleAction) => {
        return el.map((element: any) => {
            handleAction({
                el: element.children,
                newNode,
                action
            })
            let res = element
            switch (action) {
                case 'create':
                    newNode['hierarchy'] = element.hierarchy
                    res['children'] = newNode.parentKey === element.key ? [...element.children, newNode] : element.children
                    break
                case 'delete':
                    res['children'] = element.key !== newNode.parentKey.toString() ? element.children : element.children.length ? element.children.filter((child: any) => child.key !== newNode.key) : []
                    break
                case 'paste':
                    res['children'] = newNode.parentKey === element.key ? [...element.children, newNode] : element.children.length ? element.children.filter((child: any) => child.key !== newNode.key) : []
                    break
            }
            return res
        })
    }
}

export default ActionsModel