export async function importJSONFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string)
        resolve(json)
      } catch (err) {
        reject(new Error(`Arquivo JSON inválido ${err}`))
      }
    }

    reader.onerror = () => reject(new Error("Erro ao ler arquivo"))
    reader.readAsText(file)
  })
}
