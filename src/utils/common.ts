/* eslint-disable @typescript-eslint/no-explicit-any */
export const localAction = (
  localKey: string = 'default',
  updateData?: any | any[] | null,
  type?: 'add' | 'update' | 'remove' | 'delete',
  updateKey?: any
): any => {
  if (!type) {
    const data = localStorage.getItem(localKey)

    return data ? JSON.parse(data) : null
  }

  let localData: any = localStorage.getItem(localKey)

  if (!localData) {
    localData = []
  } else {
    localData = JSON.parse(localData)
  }

  if (type === 'add') {
    if (updateData) {
      localData = updateData
    }
  } else if (type === 'update') {
    if (updateData && typeof updateData === 'string') {
      const existingIndex = localData.findIndex((item: any) => item === updateData)

      if (existingIndex !== -1) {
        localData[existingIndex] = updateData
      } else {
        localData.push(updateData)
      }
    } else if (updateData && typeof updateData === 'object' && updateKey) {
      const existingIndex = localData.findIndex((item: any) =>
        updateKey ? item?.[updateKey] === updateData?.[updateKey] : item._id === updateData._id
      )

      if (existingIndex !== -1) {
        const filteredData = localData.filter((item: any) =>
          updateKey ? item?.[updateKey] !== updateData?.[updateKey] : item._id !== updateData._id
        )

        localData = [...filteredData, updateData]
      } else {
        localData.push(updateData)
      }
    }
  } else if (type === 'remove') {
    if (updateData && typeof updateData === 'string') {
      const dataIndex = localData.findIndex((item: any) => item === updateData)

      if (dataIndex !== -1) {
        localData.splice(dataIndex, 1)
      }
    } else if (updateData && typeof updateData === 'object' && updateKey) {
      const dataIndex = localData.findIndex((item: any) => item[updateKey] === updateData[updateKey])

      if (dataIndex !== -1) {
        localData.splice(dataIndex, 1)
      }
    }
  } else if (type === 'delete') {
    localStorage.removeItem(localKey)
  }

  localStorage.setItem(localKey, JSON.stringify(localData))

  return localData
}

export const shuffleArray = (array: any[]) => {
  const shuffledArray = [...array]

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}

export const stateAction = (
  setData: React.Dispatch<React.SetStateAction<any[]>>,
  id: string | null,
  dataUpdate: any | any[] | null,
  actionType: 'update' | 'remove' | 'add' | 'switch',
  setLocalFunction?: React.Dispatch<React.SetStateAction<any>>,
  key?: string
) => {
  setData((prevData: any[]) => {
    let newData = [...prevData]

    switch (actionType) {
      case 'update':
        if (newData) {
          if (typeof dataUpdate === 'string') {
            if (newData.includes(id)) {
              const updatedData = newData.map((item) => (item._id === id ? { ...item, dataUpdate } : item))

              return updatedData
            } else {
              newData.push(dataUpdate)
            }
          }

          if (Array.isArray(dataUpdate as unknown as any[])) {
            const itemIndex = newData.findIndex((item) => (key ? item?.[key] === id : item._id === id))
            dataUpdate?.forEach((item: any) => {
              if (itemIndex) {
                const updatedData = newData.map((item) =>
                  key
                    ? item?.[key] === dataUpdate?.[key as unknown as any]
                    : item._id === dataUpdate?._id
                    ? { ...item, ...dataUpdate }
                    : item
                )

                return updatedData
              } else {
                newData.push(item)
              }
            })
          } else {
            if (newData.find((item) => (key ? item?.[key] === id : item._id === id))) {
              const updatedData = newData.map((item) =>
                key
                  ? item?.[key] === dataUpdate?.[key]
                  : item._id === dataUpdate._id
                  ? { ...item, ...dataUpdate }
                  : item
              )

              return updatedData
            } else {
              newData.push(dataUpdate)
            }
          }

          setLocalFunction && setLocalFunction(newData)

          return newData
        } else {
          if (Array.isArray(dataUpdate)) {
            setLocalFunction && setLocalFunction(dataUpdate)

            return dataUpdate
          }

          setLocalFunction && setLocalFunction([dataUpdate])

          return [dataUpdate]
        }

      case 'remove':
        newData = newData.filter((data) => (key ? data?.[key] !== id : data._id !== id))

        setLocalFunction && setLocalFunction(newData)

        return newData

      case 'add':
        if (newData) {
          if (typeof dataUpdate === 'string') {
            if (newData.includes(dataUpdate)) {
              return newData
            } else {
              newData.push(dataUpdate)
            }
          }

          if (Array.isArray(dataUpdate as unknown as any[])) {
            const itemIndex = newData.findIndex((item) =>
              key ? item?.[key] === dataUpdate?.[key] : item._id === dataUpdate?._id
            )
            dataUpdate?.forEach((item: any) => {
              if (itemIndex === -1) {
                return newData
              } else {
                newData.push(item)
              }
            })
          } else {
            if (newData.find((item) => (key ? item?.[key] === dataUpdate?.[key] : item._id === dataUpdate._id))) {
              return newData
            } else {
              newData.push(dataUpdate)
            }
          }

          setLocalFunction && setLocalFunction(newData)

          return newData
        } else {
          if (Array.isArray(dataUpdate)) {
            setLocalFunction && setLocalFunction(dataUpdate)

            return dataUpdate
          }

          setLocalFunction && setLocalFunction([dataUpdate])

          return [dataUpdate]
        }

      case 'switch':
        if (newData) {
          if (Array.isArray(dataUpdate)) {
            dataUpdate.forEach((i) => {
              if (newData.includes(i)) {
                newData = newData.filter((data) => data !== i)
              } else {
                newData.push(i)
              }
            })
          } else {
            if (newData.includes(dataUpdate)) {
              newData = newData.filter((data) => data !== dataUpdate)
            } else {
              newData.push(dataUpdate)
            }
          }

          setLocalFunction && setLocalFunction(newData)

          return newData
        } else {
          if (Array.isArray(dataUpdate)) {
            setLocalFunction && setLocalFunction(dataUpdate)

            return dataUpdate
          }

          setLocalFunction && setLocalFunction([dataUpdate])

          return [dataUpdate]
        }

      default:
        return prevData
    }
  })
}

export const nextChildId = (
  arr: any[],
  parentId?: string,
  childId?: string,
  parentKey: string = '_id',
  childKey: string = '_id',
  childrenKey: string = 'children'
) => {
  // Find the parent object
  const parent = arr.find((item) => item[parentKey] === parentId)

  // If parentId is null or not found, return the first parent and its first child
  if (!parent) {
    const firstParent = arr[0]
    const children = firstParent[childrenKey]
    return { parentId: firstParent[parentKey], childId: children[0][childKey], isLastChild: children.length === 1 }
  }

  // Find the index of the current childId in the parent's child array
  const childIndex = parent[childrenKey].findIndex((child: any) => child[childKey] === childId)

  // If the childId is the last child in the parent's child array, move to the next parent
  if (childIndex === parent[childrenKey].length - 1) {
    const nextParentIndex = arr.findIndex((item) => item[parentKey] === parentId) + 1
    const nextParent = arr[nextParentIndex]
    const children = nextParent[childrenKey]
    return { parentId: nextParent[parentKey], childId: children[0][childKey], isLastChild: children.length === 1 }
  } else {
    // Otherwise, return the current parent and the next child
    return { parentId: parentId, childId: parent[childrenKey][childIndex + 1][childKey], isLastChild: false }
  }
}

export const debounce = (func: any, timeout = 500) => {
  let timer: any

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

export const formatNumberToString = (num: number) => {
  const formatter = new Intl.NumberFormat('vi-VN')
  return formatter.format(num)
}

export const formatNumber = (num: number) => {
  if (num >= 1000000000) {
    let formattedNum = Math.floor((num / 1000000000) * 10) / 10
    return formattedNum + 'B'
  } else if (num >= 1000000) {
    let formattedNum = Math.floor((num / 1000000) * 10) / 10
    return formattedNum + 'M'
  } else if (num >= 10000) {
    let formattedNum = Math.floor((num / 1000) * 10) / 10
    return formattedNum + 'K'
  } else {
    return formatNumberToString(num)
  }
}
