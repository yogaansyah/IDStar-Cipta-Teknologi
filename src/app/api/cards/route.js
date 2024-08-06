import fs from 'fs'
import path from 'path'

export async function GET(request) {
    const filePath = path.join(process.cwd(), 'public', 'mocks',  'data.json')
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    })
}
