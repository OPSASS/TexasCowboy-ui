import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { BreadcrumbItemType } from 'antd/lib/breadcrumb/Breadcrumb'
import { useLocation } from 'react-router-dom'

interface TransformedItem {
  _id: string
  label: React.ReactNode | string
  children: TransformedItem[]
  href: string
  icon: React.ReactNode | string
}

type Props = {
  items?: any[]
  separator?: string
  homeUrl?: string
  homeTitle?: string
  homeIcon?: React.ReactNode
  addHomePage?: boolean
  showIcon?: boolean
  showPathname?: boolean
}

const BreadCrumbsDynamic = (props: Props) => {
  const {
    items,
    separator,
    homeUrl = '/',
    homeTitle,
    homeIcon,
    addHomePage,
    showIcon = false,
    showPathname = false
  } = props
  const location = useLocation().pathname

  const breadCrumbView = () => {
    const capatilize = (s: string) =>
      s.replace(/[-_+/\s]+/g, ' ').replace(/(?:^|\s)\S/g, (a) => {
        return a.toUpperCase()
      })

    const breadCrumbData: BreadcrumbItemType[] = []
    const homePage = {
      href: homeUrl,
      title: (
        <>
          {homeIcon ? homeIcon : <HomeOutlined />}
          {homeTitle && <span>{homeTitle}</span>}
        </>
      )
    }

    if (addHomePage) breadCrumbData.push(homePage)

    const findLabelsRecursive = (node: TransformedItem[], pathArr: string[], parentSlug?: string) => {
      const currentNode = node.find((item) => item.href?.includes(pathArr[0]))
      const currentNode1 = node.find((item) => item.href?.includes(pathArr[1]))
      const fullSlug = currentNode
        ? parentSlug
          ? `${parentSlug}${currentNode.href}`
          : currentNode.href
        : currentNode1
        ? parentSlug
          ? `${parentSlug}${currentNode1.href}`
          : `${pathArr[1]}`
        : ''

      if (!currentNode && !parentSlug) {
        breadCrumbData.push({
          href: `/${pathArr[0]}`,
          title: capatilize(pathArr[0])
        })
      }

      if (currentNode && !currentNode1) {
        breadCrumbData.push({
          href: fullSlug,
          title: (
            <>
              {showIcon && currentNode?.icon}
              <span>{showPathname ? capatilize(currentNode?.href) : currentNode.label}</span>
            </>
          )
        })

        if (currentNode.children.length > 0 && pathArr.length > 1) {
          findLabelsRecursive(currentNode.children, pathArr.slice(1), fullSlug)
        }
      } else if (currentNode1) {
        breadCrumbData.push({
          href: fullSlug,
          title: (
            <>
              {showIcon && currentNode1?.icon}
              <span>{showPathname ? capatilize(currentNode1?.href) : currentNode1.label}</span>
            </>
          )
        })

        if (currentNode1.children.length > 0 && pathArr.length > 1) {
          findLabelsRecursive(currentNode1.children, pathArr.slice(1), fullSlug)
        }
      }
    }

    const pathArray = location.split('/').filter((item) => item !== '')

    if (items) {
      const index = items.findIndex((item) => item?.items?.some((i: any) => i.href.includes(pathArray?.[1])))

      findLabelsRecursive(index !== -1 ? items[0].items : items, pathArray, undefined)
    }

    return <Breadcrumb items={breadCrumbData} separator={separator} />
  }

  return breadCrumbView()
}

export default BreadCrumbsDynamic
