from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)

# Enable CORS with specific configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Check if running in mock mode
api_key = os.getenv('OPENAI_API_KEY', 'your_openai_api_key_here')
is_mock_mode = api_key == 'your_openai_api_key_here' or not api_key

if is_mock_mode:
    print("⚠️ Running in MOCK MODE - Using test data instead of OpenAI API")
    client = None
else:
    # Configure OpenAI API
    client = OpenAI(api_key=api_key)

@app.route('/api/generate-code', methods=['POST', 'OPTIONS'])
def generate_code():
    if request.method == 'OPTIONS':
        return '', 204
    
    try:
        data = request.json
        if not data:
            return jsonify({'success': False, 'error': 'No JSON data received'}), 400
            
        user_idea = data.get('idea', '')
        
        if is_mock_mode:
            # Return mock React component based on user's idea
            title = user_idea.split(' ')[0] if user_idea else "Website"
            mock_code = f'''import React, {{ useState }} from 'react';

export default function GeneratedApp() {{
  const [formData, setFormData] = useState({{}});

  const handleSubmit = (e) => {{
    e.preventDefault();
    console.log('Form submitted:', formData);
  }};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-600">
            {user_idea}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={{(e) => setFormData({{...formData, name: e.target.value}})}}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  onChange={{(e) => setFormData({{...formData, email: e.target.value}})}}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Tell us your thoughts..."
                  rows="5"
                  onChange={{(e) => setFormData({{...formData, message: e.target.value}})}}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            onClick={{handleSubmit}}
            className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            Submit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-800 mb-2">Fast</h3>
            <p className="text-gray-600 text-sm">Optimized for speed and performance</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-bold text-gray-800 mb-2">Beautiful</h3>
            <p className="text-gray-600 text-sm">Modern and responsive design</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold text-gray-800 mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">Built with security in mind</p>
          </div>
        </div>
      </div>
    </div>
  );
}}'''
            
            return jsonify({
                'success': True,
                'code': mock_code,
                'description': f'Website for: {user_idea}',
                'techStack': ['React', 'Tailwind CSS', 'JavaScript'],
                'deploymentReady': True
            })
        
        # Real OpenAI API call
        prompt = f"""You are an expert web developer. Generate a complete, production-ready React.js website based on this idea:

USER IDEA: {user_idea}

REQUIREMENTS:
1. Generate ONLY the React component code (functional components with hooks)
2. Use modern React best practices
3. Include responsive design with Tailwind CSS classes
4. Make it visually appealing and interactive

OUTPUT FORMAT (Return ONLY valid JSON):
{{"component": "// Code here", "description": "Brief description", "techStack": ["React", "Tailwind CSS"], "deploymentReady": true}}

Generate the code now:"""
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert web developer. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        
        result_text = response.choices[0].message.content.strip()
        
        # Clean the response
        if result_text.startswith('```json'):
            result_text = result_text[7:]
        if result_text.startswith('```'):
            result_text = result_text[3:]
        if result_text.endswith('```'):
            result_text = result_text[:-3]
        result_text = result_text.strip()
        
        result = json.loads(result_text)
        
        return jsonify({
            'success': True,
            'code': result.get('component', ''),
            'description': result.get('description', ''),
            'techStack': result.get('techStack', []),
            'deploymentReady': result.get('deploymentReady', False)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/validate-deployment', methods=['POST'])
def validate_deployment():
    try:
        data = request.json
        code = data.get('code', '')
        
        if is_mock_mode:
            return jsonify({
                'success': True,
                'validation': {
                    'isReady': True,
                    'issues': [],
                    'recommendations': [
                        'Add comprehensive error handling',
                        'Include unit tests',
                        'Optimize bundle size',
                        'Add accessibility features'
                    ]
                }
            })

        prompt = f"""Analyze this React code and determine if it's ready for deployment.

CODE:
{code}

Check for: 1. Valid React syntax, 2. Missing imports, 3. Component structure, 4. Errors

Return ONLY valid JSON: {{"isReady": true/false, "issues": [...], "recommendations": [...]}}"""
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert code reviewer. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )
        
        result_text = response.choices[0].message.content.strip()
        
        if result_text.startswith('```json'):
            result_text = result_text[7:]
        if result_text.startswith('```'):
            result_text = result_text[3:]
        if result_text.endswith('```'):
            result_text = result_text[:-3]
        result_text = result_text.strip()
        
        validation = json.loads(result_text)
        
        return jsonify({'success': True, 'validation': validation})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/post-deploy-summary', methods=['POST'])
def post_deploy_summary():
    try:
        data = request.json
        code = data.get('code', '')
        
        if is_mock_mode:
            return jsonify({
                'success': True,
                'summary': {
                    'summary': 'This is a fully functional React component with responsive design.',
                    'features': [
                        'Responsive design with Tailwind CSS',
                        'Modern React hooks',
                        'Interactive user interface',
                        'Clean and maintainable code'
                    ],
                    'improvements': [
                        'Add API integration',
                        'Implement state management',
                        'Add unit tests',
                        'Set up CI/CD pipeline'
                    ]
                }
            })

        prompt = f"""Provide a post-deployment summary for this React app.

CODE:
{code}

Return ONLY JSON: {{"summary": "...", "features": [...], "improvements": [...]}}"""
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a technical documentation expert. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        
        result_text = response.choices[0].message.content.strip()
        
        if result_text.startswith('```json'):
            result_text = result_text[7:]
        if result_text.startswith('```'):
            result_text = result_text[3:]
        if result_text.endswith('```'):
            result_text = result_text[:-3]
        result_text = result_text.strip()
        
        result = json.loads(result_text)
        
        return jsonify({'success': True, 'summary': result})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'mode': 'mock' if is_mock_mode else 'production'
    })

if __name__ == '__main__':
    print("\n🚀 Flask Backend Starting...")
    print(f"📍 Running on http://localhost:5000")
    print(f"{'⚠️ MOCK MODE - No API keys needed' if is_mock_mode else '✅ PRODUCTION MODE'}\n")
    app.run(debug=True, port=5000)
