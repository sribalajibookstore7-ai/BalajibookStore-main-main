// Funções para enviar requisições às API's externas.

// Função para autenticar usuário
// Recebe um nome de usuário e senha, retorna os dados do usuário autenticado.
export const UserLogin = async (username: string, password: string) =>{
    
    const response = await fetch('https://dummyjson.com/auth/login', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    
    });

    if (!response.ok) {
        throw new Error('Credenciais inválidas');
    }

    return response.json();

};

// Função para buscar produtos da API
// Recebe um limite e um deslocamento (skip) para paginação.
export const getProductsAPI = async(limit: number, skip: number) =>{

    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`,)
    
    return await response.json();

}

// Função para buscar detalhes de um produto específico
// Recebe o ID do produto.
export const getProductAPI = async(id: number) =>{

    const response = await fetch(`https://dummyjson.com/products/${id}`,)

    if (!response.ok) {
        throw new Error('Produto não encontrado');
    }

    return await response.json();

}

